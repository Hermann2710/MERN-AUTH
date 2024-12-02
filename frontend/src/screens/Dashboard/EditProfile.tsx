import { SyntheticEvent, useState } from "react";
import FormControl from "../../components/FormControl";
import { BsAt } from "react-icons/bs";
import FormButton from "../../components/FormButton";
import { TfiEmail } from "react-icons/tfi";

function EditProfile({id}: {id: string}) {
  const [data, setData] = useState({
    username: "",
    email: "",
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
      <h1 className="mt-5 font-bold text-xl mb-20 sm:mb-10">Edit profile</h1>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <FormControl
          handleChange={onInputChange}
          value={data.username}
          placeholder="Username"
          name="username"
          id="username"
          type="text"
          Icon={BsAt}
        />
        <FormControl
          handleChange={onInputChange}
          value={data.email}
          placeholder="Email"
          name="email"
          id="email"
          type="email"
          Icon={TfiEmail}
        />
        <FormButton text="Edit profile" type="button" />
      </form>
    </section>
  );
}

export default EditProfile;
