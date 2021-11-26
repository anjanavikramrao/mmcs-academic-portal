import { Fragment } from "react";

import { Slider } from "react-burgers";
import { useRouter } from "next/router";
import Image from 'next/image';

const Header = (props) => {
  const router = useRouter();
  
  const logout = async (event) => {
    const { supabase, setProps } = props;
    const { error } = await supabase.auth.signOut();
    if(error) {
      console.log("Error in logging out", error);
    }
    setProps("loggedIn", false);
    router.push('/Auth/Signin');
    event.preventDefault();
  }

    return (
        <Fragment>
          <div className="app-header header-shadow">
            <div className="app-header__content">
              <div className="app-header-left">
            {/*   <div className="app-header__logo">
                </div> */}
           <Image src="/logo.png" alt="me" width="54" height="54" />
                <Slider width={26} lineHeight={2} lineSpacing={5} color="#6c757d" 
                active={props.getProp("collapse")} onClick={() => props.setProps("collapse", !props.getProp("collapse"))} />

                
                {/**
                 * Components to be added later
                 */}
              </div>
              <div className="app-header-right">
                <div onClick={logout}>Logout</div>
                {/**
                 * Components to be added later
                 */}
              </div>
            </div>
          </div>
        </Fragment>
      );
}

export default Header;