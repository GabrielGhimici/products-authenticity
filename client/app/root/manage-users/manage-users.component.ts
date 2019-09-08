import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserManagementActions } from '../../store/user-management/user-management.actions';
import { dispatch, select } from '@angular-redux/store';
import { Observable, Subject } from 'rxjs';
import { User } from '../../core/user/user';
import { Entity } from '../../core/entity/entity';
import { Role } from '../../core/user/role';
import { takeUntil } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit, OnDestroy {
  @select(['authenticatedUser', 'user', 'role', 'id']) currentUserRole$: Observable<number>;
  @select(['authenticatedUser', 'user', 'parentEntityId']) parentEntityId$: Observable<number>;
  @select(['userManagement', 'users']) readonly users$: Observable<Array<User>>;
  @select(['userManagement', 'loading']) readonly usersLoading$: Observable<boolean>;
  @select(['dataSource', 'entity', 'items']) readonly entities$: Observable<Array<Entity>>;
  @select(['dataSource', 'entity', 'loading']) readonly entitiesLoading$: Observable<boolean>;
  @select(['dataSource', 'role', 'items']) readonly roles$: Observable<Array<Role>>;
  @select(['dataSource', 'role', 'loading']) readonly rolesLoading$: Observable<boolean>;
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  public users: Array<User> = [];
  public entities: Array<Entity> = [];
  public roles: Array<Role> = [];
  public currentUserRole: number;
  public usersLoading = true;
  public entitiesLoading = true;
  public rolesLoading = true;
  public parentEntityId: number;
  public displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'role', 'parentEntity', 'actions'];
  public dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();

  constructor(
    private userManagementActions: UserManagementActions
  ) { }

  ngOnInit() {
    this.loadUsers();
    this.currentUserRole$.pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe((role) => {
      this.currentUserRole = role;
    });
    this.parentEntityId$.pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe((entityId) => {
      this.parentEntityId = entityId;
    });
    this.users$.pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe((users) => {
      this.users = users;
      console.log(users);
      this.dataSource.data = users;
    });
    this.roles$.pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe((roles) => {
      this.roles = roles;
    });
    this.entities$.pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe((entities) => {
      this.entities = entities;
    });
    this.usersLoading$.pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe((usersLoading) => {
      this.usersLoading = usersLoading;
    });
    this.entitiesLoading$.pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe((entitiesLoading) => {
      this.entitiesLoading = entitiesLoading;
    });
    this.rolesLoading$.pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe((rolesLoading) => {
      this.rolesLoading = rolesLoading;
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  applyFilter(filterValue: string) {
    this.dataSource.data = this.users.filter((user: User) => {
      const filter = filterValue.trim().toLowerCase();
      return user.id.toString().includes(filter) ||
             user.firstName.includes(filter) ||
             user.lastName.includes(filter) ||
             user.email.includes(filter) ||
             user.role.name.includes(filter) ||
             (user.parentEntity && user.parentEntity.name.includes(filter));
    });
  }

  getName(id: number, context: Array<Entity> | Array<Role>) {
    let name = '-';
    if (id > 0) {
      context.forEach((entity: Entity) => {
        if (entity.id === id) {
          name = entity.name;
        }
      });
    }
    return name;
  }

  @dispatch()
  loadUsers() {
    return this.userManagementActions.loadUsers();
  }

  @dispatch()
  addUserTo(userId: number, entityId: number) {
    const entity = entityId ? entityId : this.parentEntityId;
    return this.userManagementActions.addingUser(userId, entity);
  }

  @dispatch()
  removeFromEntity(userId: number) {
    return this.userManagementActions.removingUser(userId);
  }

  @dispatch()
  switchRole(userId: number, roleId: number) {
    return this.userManagementActions.updateUserRole(userId, roleId);
  }

}
