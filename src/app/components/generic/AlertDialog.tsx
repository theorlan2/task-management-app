import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  onIsOk: () => void;
};

export default function AlertDialog({ isOpen, setIsOpen, onIsOk }: Props) {
  function close() {
    setIsOpen(false);
  }

  return (
    <>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
        __demoMode
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/50">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle as="h3" className="text-lg font-medium text-black">
                Are you sure you want to delete this element?
              </DialogTitle>
              <p className="mt-2 text-sm/6 text-black/50">
                This action cannot be undone.
              </p>
              <div className="mt-4 flex justify-end gap-3">
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-neutral-gray-200 py-1.5 px-3 text-sm/6 font-semibold text-black shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-neutral-gray-300 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-neutral-gray-200"
                  onClick={close}
                >
                  Cancel
                </Button>
                <Button
                  className="inline-flex items-center gap-2 rounded-md border border-red-500 py-1.5 px-3 text-sm/6 font-semibold text-red-500 shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-red-200 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-red-500"
                  onClick={() => {
                    // Add the logic to delete the element here
                    close();
                    onIsOk();
                  }}
                >
                  Delete
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
