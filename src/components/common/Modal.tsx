/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, type ReactNode, createContext, useContext } from 'react';
import { create } from 'zustand';
import clsx from 'clsx';
import { X } from 'lucide-react';

const sizeOptions = {
  sm: '!max-w-sm',
  md: '!max-w-md',
  lg: '!max-w-lg',
  xl: '!max-w-xl',
  '2xl': '!max-w-2xl',
  '3xl': '!max-w-3xl',
  '4xl': '!max-w-4xl',
  '5xl': '!max-w-5xl',
  '6xl': '!max-w-6xl',
} as const;

type SizeOption = keyof typeof sizeOptions;

interface ModalConfig {
  id: string;
  title?: string | React.ReactNode;
  description?: string;
  size?: SizeOption;
  component: React.ComponentType<any>;
  props?: Record<string, any>;
  onClose?: () => void;
  hideClose?: boolean;
  titleClassName?: string;
  titleContainerClassName?: string;
  closeOutsideClick?: boolean;
}

interface ModalContextValue {
  showModal: <T extends Record<string, any>>(
    config: Omit<ModalConfig, 'props'> & { props?: T; id?: string }
  ) => string;
  close: (id?: string) => void;
  isOpen: boolean;
  setSize: (id: string, size: SizeOption) => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

interface ModalStore {
  modals: ModalConfig[];
  open: (config: ModalConfig) => void;
  close: (id?: string) => void;
  updateSize: (id: string, size: SizeOption) => void;
}

const useModalStore = create<ModalStore>((set) => ({
  modals: [],
  open: (config) =>
    set((state) => ({
      modals: [...state.modals, config],
    })),
  close: (id) =>
    set((state) => ({
      modals: id ? state.modals.filter((modal) => modal.id !== id) : [],
    })),
  updateSize: (id, size) =>
    set((state) => ({
      modals: state.modals.map((modal) =>
        modal.id === id ? { ...modal, size } : modal
      ),
    })),
}));

interface ModalProps {
  config: ModalConfig;
}

const Modal: React.FC<ModalProps> = ({ config }) => {
  const { close } = useModalStore();
  const {
    id,
    title,
    description,
    size = '2xl',
    component: Component,
    props = {},
    onClose,
    hideClose,
    titleClassName,
    titleContainerClassName,
    closeOutsideClick = true,
  } = config;

  const handleClose = () => {
    if (!hideClose) {
      close(id);
      onClose?.();
    }
  };

  return (
    <Transition.Root appear show={true} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-40"
        onClose={closeOutsideClick ? handleClose : () => {}}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className={clsx(
                  'relative w-full transform overflow-visible rounded-lg bg-white text-left shadow-lg transition-all',
                  sizeOptions[size]
                )}
              >
                {title && (
                  <div
                    className={clsx(
                      'flex justify-between rounded-t-lg border-b bg-gray-50 p-4',
                      titleContainerClassName
                    )}
                  >
                    <div className="flex flex-col gap-1">
                      {typeof title === 'string' ? (
                        <div
                          className={clsx(
                            'truncate leading-[18px] font-semibold',
                            titleClassName
                          )}
                        >
                          {title}
                        </div>
                      ) : (
                        title
                      )}
                      {description && (
                        <div className="truncate text-sm leading-[18px] font-normal text-gray-500">
                          {description}
                        </div>
                      )}
                    </div>
                    {!hideClose && (
                      <button
                        className="mr-3 h-2 w-2 border-0 ring-0 outline-none hover:text-blue-600 focus:ring-0 focus:outline-none"
                        type="button"
                        title="Modal Close"
                        onClick={handleClose}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                )}
                <div className="p-4">
                  <Component {...props} />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const { modals, open, close, updateSize } = useModalStore();

  const showModal = <T extends Record<string, any>>(
    config: Omit<ModalConfig, 'props'> & { props?: T; id?: string }
  ) => {
    const id = config.id || Math.random().toString(36).substring(2, 9);
    open({ ...config, id });
    return id;
  };

  const setSize = (id: string, size: SizeOption) => {
    updateSize(id, size);
  };

  const value = {
    showModal,
    close,
    isOpen: modals.length > 0,
    setSize,
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
      {modals.map((modal) => (
        <Modal key={modal.id} config={modal} />
      ))}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

export const showModal = <T extends Record<string, any>>(
  config: Omit<ModalConfig, 'props'> & { props?: T; id?: string }
) => {
  const { open } = useModalStore.getState();
  const id = config.id || Math.random().toString(36).substring(2, 9);
  open({ ...config, id });
  return id;
};

export const ModalFooter = ({ children }: { children: React.ReactNode }) => (
  <div className="mt-6 flex flex-row-reverse items-end justify-start gap-1 px-6 pb-6">
    {children}
  </div>
);
