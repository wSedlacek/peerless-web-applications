import { EntityState, EntityStore, getEntityType, ID } from '@datorama/akita';
import { CollectionService, DocOptions, PathParams, SyncOptions } from 'akita-ng-fire';

import { DocumentChangeAction } from '@angular/fire/firestore/interfaces';
import { SessionService } from '@peerless/client/session';
import { BehaviorSubject, Observable, ObservableInput } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

/**
 * @description An extension of {CollectionService} that provides a uid param
 * from the session service, functions to sync while logged in, and resets the
 * store when the user logs out.
 * @see CollectionService
 */
export class UserDrivenCollectionService<
  S extends EntityState<EntityType, string>,
  EntityType = getEntityType<S>
> extends CollectionService<S, EntityType> {
  constructor(
    protected readonly store: EntityStore<S>,
    protected readonly session: SessionService
  ) {
    super(store);
    this.initializeEffects();
  }

  private readonly uid$ = new BehaviorSubject<string | undefined>(undefined);

  private initializeEffects(): void {
    this.session.user$.pipe(filter((user) => user === null)).subscribe(() => this.store.reset());
    this.session.uid$.subscribe({
      next: (...args) => this.uid$.next(...args),
      complete: (...args) => this.uid$.complete(...args),
      error: (...args) => this.uid$.error(...args),
    });
  }

  @Override()
  protected getPath(options: PathParams): string {
    const uid = this.uid$.getValue();
    if (!uid) throw new Error('User is not logged in');
    const params = { uid, ...options.params };

    return super.getPath({ ...options, params });
  }

  @Override()
  public get currentPath(): string {
    return this.getPath({});
  }

  public readonly syncCollectionWhileLoggedIn = (
    syncOptions?: Partial<SyncOptions>
  ): Observable<DocumentChangeAction<EntityType>[]> =>
    this.session.whileLoggedIn$.pipe(switchMap(() => this.syncCollection(syncOptions)));

  public readonly syncActiveWhileLoggedIn = (
    options: S['active'] extends any[] ? string[] : DocOptions,
    syncOptions?: Partial<SyncOptions>
  ) => this.session.whileLoggedIn$.pipe(switchMap(() => this.syncActive(options, syncOptions)));
}
