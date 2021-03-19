import React from "react";
import JournalMoment from "./journal_moment";
import totalMoments from "../../imageAssets/Icons/General/totalMoments.png";
import answersRecieved from "../../imageAssets/Icons/General/answersRecieved.png";
import graph from "../../imageAssets/Icons/General/graph.png";
import axios from "axios";

class momentForm extends React.Component {
  constructor(props) {

    super(props);

    this.state ={
      items:[],
      currentItem:{
        title:'Lockdown woes is the title',
        content:'Oh boy is lockdown boring, this would be the content ',
        date: new Date().toLocaleString()
      }
    }

    this.getPosts();
    this.addItem = this.addItem.bind(this);
  }

  getPosts() { // Gets all the posts

    axios.get('http://localhost:8001/api/v1/momentone/posts').then(res =>{

      this.setState({
        items:res.data.data.posts,
        momentNo:res.data.data.numberOfPosts,
      })
     
    })
  }

  addItem(e){
    e.preventDefault();

    const newItem = this.state.currentItem;
    console.log(newItem);

    const newItems=[...this.state.items,newItem];
    this.setState({
      items:newItems,
      currentItem:{
        title:'',
        content:'',
        date:'',
      }
    })
    }
  


    render() {
        return (
          <div>
            <div className="momentsAnswersWrap">
              <div className="totalMoments">
                <div className="imgBack">
                  <img src={totalMoments}/>
                </div>

                <div className="textWrap">
                  <h1 className="number">{this.state.momentNo}</h1>
                  <p className="subTitle">Total Moments</p>
                  <p className="percent"><img src={graph}/> 4% (30days)</p>
                </div>

                <h2></h2>

              </div>
              <div className="answersRecieved">
                <div className="imgBack">
                  <img src={answersRecieved}/>
                  </div>
                  <div className="textWrap">
                  <h1 className="number">15</h1>
                  <p className="subTitle">Answers Recieved</p>
                  <p className="percent"><img src={graph}/> 4% (30days)</p>

                </div>
              </div>
            </div>

            <div className="journal">
            <div className = "momentList">
            
            <JournalMoment items={this.state.items} />

              </div>
           </div>
          </div>
          )
    }
}

export default momentForm;