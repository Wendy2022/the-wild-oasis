import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add new cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>

        {/* <Modal.Open opens="table">
        <Button>Show</Button>
      </Modal.Open>
      <Modal.Window name="table">
        <CabinTable />
      </Modal.Window> */}
      </Modal>
    </div>
  );
}

/* function AddCabin() {
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
} */
export default AddCabin;
