import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";

import { useStyles } from "./styles";

const CustomDialog = (props) => {
  const {
    open,
    handleOpen,
    showActionBar,
    cancelButton,
    okButton,
    actions,
    title,
    children,
  } = props;

  const classes = useStyles();

  const handleClose = () => {
    handleOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="custom-dialog-title"
      aria-describedby="custom-dialog-description"
    >
      {title && (
        <DialogTitle id="custom-dialog-title" className={classes.title}>
          {title}
        </DialogTitle>
      )}
      <DialogContent className={classes.content}>{children}</DialogContent>
      {showActionBar && (
        <DialogActions className={classes.actions}>
          {actions}
          {cancelButton && (
            <Button onClick={handleClose} color="primary">
              {cancelButton}
            </Button>
          )}
          {okButton && (
            <Button
              onClick={handleClose}
              color="primary"
              className={classes.btn}
              variant="contained"
              autoFocus
            >
              {okButton}
            </Button>
          )}
        </DialogActions>
      )}
    </Dialog>
  );
};

CustomDialog.propTypes = {
  title: PropTypes.node,
  open: PropTypes.bool,
  showActionBar: PropTypes.bool,
  cancelButton: PropTypes.node,
  okButton: PropTypes.node,
  actions: PropTypes.node,
  children: PropTypes.node,
  handleOpen: PropTypes.func,
};

CustomDialog.defaultProps = {
  title: "",
  open: false,
  showActionBar: true,
  cancelButton: "Cancel",
  okButton: "Ok",
  actions: undefined,
  children: undefined,
  handleOpen: () => {},
};

export default CustomDialog;
