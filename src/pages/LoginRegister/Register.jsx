import axios from "axios";
import { useContext } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../components/AuthProvider/AuthProvider";

const Register = () => {
  const {createUser, updateCreateUser} = useContext(AuthContext);
  const navigate = useNavigate();
  const handleRegisterInfo = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photoUrl = e.target.photoUrl.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    // const user = {name, photoUrl, email, password};
    // console.log(user);

    if (password.length < 6) {
      toast.error("Password should be at least 6 characters");
      return;
    }

    const passCheck = /^(?=.*[a-z])(?=.*[A-Z])/;
    if (!passCheck.test(password)) {
      toast.error("Password should be at least one upper and lower case");
      return;
    }

    createUser(email, password)
      .then((res) => {
        console.log(res.user);
        updateCreateUser(name, photoUrl)
          .then(() => {
            toast.success("Update Username & Photo");
          })
          .catch((error) => {
            console.log(error.message);
          });
        e.target.reset();
        toast.success("Successfully Registered");
        axios
          .post(
            "https://stay-inn-server.vercel.app/jwt",
            {email},
            {withCredentials: true}
          )
          .then((res) => {
            console.log(res.data);
            if (res.data.success) {
              setTimeout(() => {
                navigate("/");
                window.location.reload();
              }, 1000);
            }
          });

        const user = {name, email, photoUrl};
        axios
          .post(
            "https://stay-inn-server.vercel.app/users",
            user
          )
          .then((res) => {
            console.log(res.data);
          });
      })
      .catch((error) => {
        toast.error("Error Occured");
        console.log(error.message);
      });
  };

  return (
    <div className="w-11/12 md:w-4/5 mx-auto py-10">
      <Helmet>
        <title>Stay Inn | Register</title>
      </Helmet>
      <div className="grid md:grid-cols-2 gap-10">
        <div className=" hidden md:block ">
          <div className="flex justify-center items-center  h-full">
            <img src="./logo.png" alt="" className="lg:w-4/5" />
          </div>
        </div>
        <div className=" border-2 border-gray-200 rounded-lg py-8 px-6 h-fit">
          <h3 className="text-3xl font-bold text-[#199DFF] text-center mb-6">
            Register
          </h3>
          <div>
            <form className="space-y-4" onSubmit={handleRegisterInfo}>
              <div className="space-y-2">
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Type Name"
                  name="name"
                  className="w-full border rounded-md border-black px-2 py-2"
                  required
                />
              </div>
              <div className="space-y-2">
                <label>Photo Url</label>
                <input
                  type="text"
                  placeholder="Type Photo Url"
                  name="photoUrl"
                  className="w-full border rounded-md border-black px-2 py-2"
                  required
                />
              </div>
              <div className="space-y-2">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Type Email"
                  name="email"
                  className="w-full border rounded-md border-black px-2 py-2"
                  required
                />
              </div>
              <div className="space-y-2">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Type Password"
                  name="password"
                  className="w-full border rounded-md border-black px-2 py-2"
                  required
                />
              </div>
              <div className="pt-4">
                <input
                  type="submit"
                  value="Register"
                  className="w-full border rounded-md bg-gradient-to-l from-[#3263FF] to-[#57b6ff] hover:bg-gradient-to-r text-lg hover:border hover:border-[#3263FF] text-white font-semibold px-2 py-2"
                />
              </div>
            </form>
          </div>
          <div className="space-y-4 mt-4 text-center">
            Have&apos;t any account?{" "}
            <Link to="/login" className="hover:text-[#FF3811]">
              Login account.
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
