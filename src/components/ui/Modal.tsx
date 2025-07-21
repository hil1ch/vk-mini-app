import { ModalRoot } from "@vkontakte/vkui";

interface IModalProps {
  children: React.ReactNode;
  activeModal?: string | null;
}

export function Modal({ children, activeModal }: IModalProps) {
  return (
    <ModalRoot activeModal={activeModal}>
      <div>{children}</div>
    </ModalRoot>
  );
}
