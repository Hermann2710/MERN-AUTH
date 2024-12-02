import { SyntheticEvent, useState } from "react";
import FormControl from "../../components/FormControl";
import { BsEye } from "react-icons/bs";
import FormButton from "../../components/FormButton";

function EditPassword({id}: {id: string}) {
  const [data, setData] = useState({
    password: "",
    coPassword: "",
  });

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
  }

  return (
    <section id={id}>
      <h1 className="mt-5 font-bold text-xl mb-20 sm:mb-10">Edit password</h1>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <FormControl
          handleChange={onInputChange}
          value={data.password}
          placeholder="New password"
          name="password"
          id="password"
          type="password"
          Icon={BsEye}
        />
        <FormControl
          handleChange={onInputChange}
          value={data.coPassword}
          placeholder="Confirm password"
          name="coPassword"
          id="coPassword"
          type="password"
          Icon={BsEye}
        />
        <FormButton text="Change password" type="button" />
      </form>
    </section>
  );
}

export default EditPassword;
