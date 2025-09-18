import createFastContext from 'utils/createFastContext';
import storage from 'utils/storage';

interface Session {
  isAuthenticated: boolean;
  token?: string;
}

const STORAGE_KEY = 'session';

const session = (() => {
  let state = storage.get<Session>(STORAGE_KEY, {
    isAuthenticated: false,
  });
  const update = (v: Session) => {
    state = v;
    storage.set<Session>(STORAGE_KEY, v);
  };
  return {
    state,
    update,
  };
})();

const { Provider, useStore: useSession } = createFastContext<Session>(
  session.state,
  session.update
);

export { Provider, useSession };
