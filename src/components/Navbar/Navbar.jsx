import NavbarOffer from "./NavbarOffer"
import NavbarMenu from "./NavbarMenu"
import NavbarMain from "./NavbarMain"

const Navbar = () => {
  return (
    <div className=" mx-auto">
      <NavbarOffer />
     
      <NavbarMenu />
      <NavbarMain />
    </div>
  )
}

export default Navbar
