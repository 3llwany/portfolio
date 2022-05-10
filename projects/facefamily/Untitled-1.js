if ($('#addFriend' + curr_user_id).attr('data-friend-req') == 'req_recieved') {
    $('#addFriend' + curr_user_id).click(function () {

        var friendsfRef = db.ref('Friends/' + curr_user_id + '/' + other_id);

        friendsfRef.child('type').set('friend');

        myFriendsRef = db.ref('Friends/' + other_id + '/' + curr_user_id);

        myFriendsRef.child('request_type').set('friend');

        db.ref('Friends/').child(curr_user_id + '/' + curr_user_id).on("value", snap => {
            var type = snap.child("type").val();

            if (type == 'Friend') {

                $('#addFriend' + curr_user_id).text('Friend');

                $('#addFriend' + curr_user_id).css('background', '#6464ac');

                $('#addFriend' + curr_user_id).attr('data-friend-req', 'friend');
            }
        });


    });
}

if ($('#addFriend' + user_id).attr('data-friend-req') == 'req_sent') {

    db.ref('Frind_req/' + curr_user_id + '/' + other_id).child('request_type').set('recieved').remove;

    db.ref('Frind_req/' + other_id + '/' + curr_user_id).child('request_type').set('sent').remove();

}








/* else if (friendType == null) {
                                    curr_state = 'non-friend';
                                    
                                    if ( $('#addFriend' + user_id).attr('data-value') == otherUsers_id ) {
                                        $('#addFriend' + user_id).text('Add friend');
                                        $('#addFriend' + user_id).css('background', '#6464ac');
                                        $('#addFriend' + user_id).attr('data-friend-type', ' ');
                                        
                                    }
                                }*/