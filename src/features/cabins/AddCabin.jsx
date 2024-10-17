import { useState } from "react";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

function AddCabin() {
  const [isOpenModal, setIsOpenModel] = useState(false);
  return (
    <div>
      <Button onClick={() => setIsOpenModel(!isOpenModal)}>
        Add new cabin
      </Button>
      {isOpenModal && (
        <Modal onClose={() => setIsOpenModel(false)}>
          <CreateCabinForm onCloseModel={() => setIsOpenModel(false)} />
        </Modal>
      )}
    </div>
  );
}
export default AddCabin;
