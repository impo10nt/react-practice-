import clsx from 'clsx';

export const FilterByOwnerId = ({ users, selectedUserId, onSelectUser }) => {
  return (
    <p className="panel-tabs has-text-weight-bold">
      <a
        data-cy="FilterAllUsers"
        href="#/"
        className={clsx({ 'is-active': selectedUserId === null })}
        onClick={e => {
          e.preventDefault();
          onSelectUser(null);
        }}
      >
        All
      </a>

      {users.map(user => (
        <a
          key={user.id}
          data-cy="FilterUser"
          href="#/"
          className={clsx({ 'is-active': selectedUserId === user.id })}
          onClick={e => {
            e.preventDefault();
            onSelectUser(user.id);
          }}
        >
          {user.name}
        </a>
      ))}
    </p>
  );
};
