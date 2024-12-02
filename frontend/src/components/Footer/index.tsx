function Footer() {
  return (
    <div className="w-screen text-lg flex justify-center items-center gap-5 absolute bottom-0 p-5">
      <p className="font-bold">
        &copy; <span className="text-red-500">Auth</span>-System
      </p>
      {new Date().getFullYear()}
    </div>
  );
}

export default Footer;
