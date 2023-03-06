import cities from "../components/cities.json";

const SideBar = () => {
  return (
    <div>
      <h3 className="text-white text-center text-3xl font-mono mt-8">Cities</h3>
      <div className="mt-12 mx-5 md:mx-10">
        {cities.map((each: any) => {
          return (
            <p className="text-gray-300 text-xl pointer mb-8 hover:border hover:px-4 hover:py-1 hover:cursor-pointer ">
              {each.name}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default SideBar;
