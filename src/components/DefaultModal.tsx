import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface DefaultModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  confirmText?: string;
  dialog?: string;
  onConfirm?: () => void;
  children?: React.ReactNode;
  sx?: React.CSSProperties;
}

const DefaultModal = ({
  isOpen,
  title,
  confirmText,
  dialog,
  children,
  onClose,
  onConfirm,
  sx,
}: DefaultModalProps) => {
  return (
    <Dialog open={isOpen} onClose={onClose} PaperProps={{ sx: sx }}>
      {children ? (
        <DialogContent>{children}</DialogContent>
      ) : (
        <>
          <DialogTitle>{title}</DialogTitle>
          {dialog && (
            <DialogContent>
              <DialogContentText>{dialog}</DialogContentText>
            </DialogContent>
          )}
          <DialogActions>
            <Button onClick={onClose}>{onConfirm ? "Cancel" : "Close"}</Button>
            {onConfirm && confirmText && (
              <Button color="error" onClick={onConfirm}>
                {confirmText}
              </Button>
            )}
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default DefaultModal;
