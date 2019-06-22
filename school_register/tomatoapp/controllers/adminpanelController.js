exports.adminPanel = function(req, res) {
    res.render('adminpanel-main', { 
      title: 'Lunar Admin Panel',
      adminName: res.locals.adminName,
      adminSurname: res.locals.adminSurname,
      adminLastLoginDate: res.locals.adminLastLoginDate,
      adminStatus: res.locals.adminStatus,
      
      newsTitle: res.locals.newsTitle,
      newsContent: res.locals.newsContent,
      newsDate: res.locals.newsDate,
      
      layout: 'adminpanel-layout'
    });
};

exports.userManagement = function(req, res) {
    res.render('adminpanel-user-management', { 
        title: 'Lunar Admin Panel',
        adminName: res.locals.adminName,
        adminSurname: res.locals.adminSurname,
        adminLastLoginDate: res.locals.adminLastLoginDate,
        adminStatus: res.locals.adminStatus,

        usrLogin: res.locals.login,
        usrName: res.locals.userName,
        usrSurname: res.locals.userSurname,
        usrLastLoginDate: res.locals.userLastLoginDate,
        usrStatus: res.locals.userStatus,
        usrGroup: res.locals.userGroup,
        usrPassword: res.locals.userPassword,
        usrId: res.locals.userId,
        
        groupName: res.locals.groupName,
        
        layout: 'adminpanel-layout'
    });
};

exports.groupManagement = function(req, res) {
    res.render('adminpanel-group-management', {
        groupId : res.locals.groupId,
        groupName : res.locals.groupName,

        layout: 'adminpanel-layout'
    });
}

exports.subjectManagement = function(req, res) {
    res.render('adminpanel-group-management', {
        groupId : res.locals.groupId,
        groupName : res.locals.groupName,

        layout: 'adminpanel-layout'
    });
}

exports.newsManagement = function(req, res) {
    res.render('adminpanel-news-management', {
        groupName : res.locals.groupName,

        layout: 'adminpanel-layout'
    });
}