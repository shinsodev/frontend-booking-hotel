// import { Title } from "../../router";
import Table from "../../components/Table/Table"

const AdminRoomList = () => {
  return (
    <>
      <section className="p-8">
        <div>
            <h2 className="font-medium text-3xl">
            Room List
            </h2>
        </div>
        <hr className="my-5" />
        <Table />
      </section>
    </>
  );
};

export default AdminRoomList