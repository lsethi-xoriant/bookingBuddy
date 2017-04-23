import React, { Component } from 'react';
import {hotelRecomendations} from '../data/tripRoomDummyData';
import TripRecomendationsCards from './newRecomendations/tripRecomendationsCards.jsx';
import GroupPreferencesBar from './groupPreferences/groupPreferencesBar.jsx';
import TripBookmarksList from './bookmarks/tripBookmarksList.jsx';
import TripRoomChat from './Chat/TripRoomChat.jsx';

//props: tripData, tripId, profile
class TripRoomComponents extends Component {

  constructor (props) {
    super(props);
    this.setLocation = this.setLocation.bind(this);
    this.addBookmark = this.addBookmark.bind(this);
    this.updateBookmarkVote = this.updateBookmarkVote.bind(this);
    this.addBookmarkComment = this.addBookmarkComment.bind(this);
    this.state = {
      bookmarks: props.tripData.bookmarks,
      hotelRecomendations: hotelRecomendations,
      locations: props.tripData.commonLocations, //['Cabo San Lucas']
      selectedLocation: '',
      beginning: props.tripData.commonDates.beginning , //'4/29/2017'
      duration: props.tripData.commonDates.duration, //4
      ending: props.tripData.commonDates.ending, //'5/12/2017'
      averageNightlyHotelBudget: props.tripData.averageNightlyHotelBudget //127
    };
  }

  setLocation(event) {
    this.setState({
      selectedLocation: event.target.value
    });
  }

  addBookmark(newBookmark) {
    newBookmark['bookmarkID'] = Date.now();
    newBookmark['buddyVotes'] = this.props.tripData.buddyList.map((buddy) => ({
      buddyName: buddy.name,
      buddyEmail: buddy.email,
      buddyVote: 0
    }));
    newBookmark['tripId'] = this.props.tripId;
    newBookmark['bookmarkerName'] = this.props.profile.given_name;
    newBookmark['bookmarkComments']= [];

    this.setState({
      bookmarks: this.state.bookmarks.concat(newBookmark)
    });

    this.addNewBookmarktoDB(newBookmark);
  }


  addNewBookmarktoDB(newBookmark) {
    // this might gonna need some work....

    var dataToSent = newBookmark;

    console.log('send AJAX request to ADD NEW BOOKMARK to DB');
    console.log(dataToSent);

    //@back_end_magicician_preston
    //fire off ajax requests to add new bookmark to our DB by uncommenting function below

    // $.ajax({
    //   type: 'POST',
    //   url: '/addNewBookmarktoDB',
    //   dataType: 'json',
    //   data: newBookmark,
    //   success: function() {
    //     console.log('Bookmark Added');
    //   }.bind(this)
    // });
  }

  updateBookmarkVote(bookmarkID, updatedBuddyVote) {

    var updatedBookmarks = this.state.bookmarks.map((bookmark) => {
      if (bookmark.bookmarkID === bookmarkID) {
        bookmark.buddyVotes.forEach( (buddyVoteObj) => {
          if(buddyVoteObj.buddyName === updatedBuddyVote.buddyName) {
            buddyVoteObj.buddyVote = updatedBuddyVote.buddyVote;
          }
        });
      }
      return bookmark;
    });

    this.setState({
      bookmarks: updatedBookmarks
    });

    this.updateBookmarkVoteInDb(bookmarkID, updatedBuddyVote)
  }



  //fire off ajax requests to update bookmark votes
  updateBookmarkVoteInDb(bookmarkID, updatedBuddyVote){

    var dataToSent = {
      bookmarkID: bookmarkID,
      updatedBuddyVote : updatedBuddyVote
    };

    console.log('send AJAX request to UPDATE BOOKMARK VOTE in DB');
    console.log(dataToSent);

    //@back_end_magicician_preston
    //uncommenting function below to fire off ajax requests to update a bookmark vote in DB

    // $.ajax({
    //   type: 'POST',
    //   url: '/updateBookmarkVote',
    //   dataType: 'json',
    //   data: dataToSent
    // }.bind(this));
  }

  addBookmarkComment(bookmarkID, newComment){
    var updatedBookmarks = this.state.bookmarks.map((bookmark) => {
      if (bookmark.bookmarkID === bookmarkID) {
        bookmark.bookmarkComments.push(newComment);
      }
      return bookmark;
    });

    this.setState({
      bookmarks: updatedBookmarks
    });

    this.addCommentToBookmarkInDb(bookmarkID, newComment)
  }

  //fire off ajax requests to update bookmark comments
  addCommentToBookmarkInDb(bookmarkID, newComment){
    var dataToSent = {
      bookmarkID: bookmarkID,
      commentObj: newComment
    };

    console.log('send AJAX request to ADD BOOKMARK COMMENT in DB');
    console.log(dataToSent);

    //@back_end_magicician_preston
    //uncommenting function below to fire off ajax requests to add a new comment to a bookmark in DB

    // $.ajax({
    //   type: 'POST',
    //   url: '/addCommentToBookmark',
    //   dataType: 'json',
    //   data: dataToSent
    // }.bind(this));
  }


  render() {

    return (
      <div>

        <div className="row">
          <div className="col s12 m7 l8 tripRoomMainContentContainer">
              <h1 className="orange-text darken-2">'Hiking Trip'</h1>
              <GroupPreferencesBar
                      averageNightlyHotelBudget={this.state.averageNightlyHotelBudget}
                      beginning={this.state.beginning}
                      ending={this.state.ending}
                      locations={this.state.locations}
                      selectedLocation={this.state.selectedLocation}
                      setLocation={this.setLocation}
                />
              <TripRecomendationsCards
                hotelRecomendations={this.props.hotelRecomendations}
                addBookmark={this.addBookmark}
                />
              <TripBookmarksList
                bookmarks={this.state.bookmarks}
                profile={this.props.profile}
                expediaParams={this.state}
                updateBookmarkVote={this.updateBookmarkVote}
                addBookmarkComment={this.addBookmarkComment}
              />
          </div>
          <div className="tripRoomChatContainer col s12 m5 offset-m7 l4 offset-l8 pinned card-panel green lighten-3 hide-on-small-only" style={{'height':'100%'}}>
            <h4>Booking Buddies</h4>
            <ul>
              <li>Lou</li>
              <li>Max</li>
              <li>Preston</li>
              <li>Nate</li>
              <li>Jesse</li>
            </ul>
            <TripRoomChat />
          </div>
        </div>
      </div>
    );
  }
};

export default TripRoomComponents;