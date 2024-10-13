import Sidebar from "../Sidebar/Sidebar";

const DashboardLayout = ({ children }) => {
  const role = "admin";

  return (
    <>
      <section className="bg-gray-200 pb-8">
        <div className="pt-28 mx-0 flex flex-row">
            {/* <div className="flex flex-row"> */}
            <div className="w-[20%] bg-white rounded-2xl shadow-2xl px-2 py-4">
                <Sidebar role={role} />
            </div>
            <div className="w-[80%] mx-10 bg-white rounded-2xl shadow-2xl">{children}</div>
            {/* </div> */}
        </div>
      </section>
    </>
  );
};

export default DashboardLayout