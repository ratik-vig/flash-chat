const queries = {
    checkIfUserExists: "select count(*) as count from flashchat.fc_users where fc_user_email=?",
    createUser: "insert into flashchat.fc_users(fc_user_fname, fc_user_lname, fc_user_email, fc_user_password) values(?,?,?,?)",
    loginUser: "select * from flashchat.fc_users where fc_user_email=?",
    createConversation: "insert into flashchat.fc_conversations(fc_conv_user1, fc_conv_user2, fc_conv_date_created) values(?,?,?)"
}

module.exports = queries