function get<VType>(key: string, defaultValue: VType) {
  try {
    const l1 = JSON.parse(sessionStorage.getItem(key) ?? '');
    return typeof l1 === 'string' ? JSON.parse(l1) : l1 || defaultValue;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    return defaultValue;
  }
}

function set<VType>(key: string, newValue: VType) {
  sessionStorage.setItem(key, JSON.stringify(newValue));
}

function remove(key: string) {
  sessionStorage.removeItem(key);
}

export default {
  get,
  set,
  remove,
};
