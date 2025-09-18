import { isEmpty, omitBy } from 'lodash';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const removeEmpty = (obj: any) => omitBy(obj, (x) => isEmpty(`${x}`));
