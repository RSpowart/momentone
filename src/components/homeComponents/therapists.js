
import React from 'react';
import searchIcon from "../../imageAssets/Icons/General/search.png"

const Dash_Therapists = () => {
  
        return (
            <div className="therapists">
              <p>Favourite Therapists</p>

              <form className="searchbar">
                <img className = "seachIcon" src={searchIcon} />
              <input type="text" id = "search" className="search"></input>

                </form>
   
            <div className="therapistGrid">
              <div className="therapist">
                <div className="qualification">
                
                  <h2>Dr</h2>
                </div>
                <p>Name</p>
              </div>

              <div className="therapist">
                <div className="qualification">
                  <h2>Dr</h2>
                </div>
                <p>Name</p>
              </div>

              <div className="therapist">
                <div className="qualification">
                  <h2>Dr</h2>
                </div>
                <p>Name</p>
              </div>

              <div className="therapist">
                <div className="qualification">
                  <h2>Dr</h2>
                </div>
                <p>Name</p>
              </div>

              <div className="therapist">
                <div className="qualification">
                  <h2>Dr</h2>
                </div>
                <p>Name</p>
              </div>

              <div className="therapist">
                <div className="qualification">
                  <h2>Dr</h2>
                </div>
                <p>Name</p>
              </div>
            </div>


            </div>
        )
    }
      
export default Dash_Therapists;