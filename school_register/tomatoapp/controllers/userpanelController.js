exports.userPanel = function(req, res) {
    res.render('usrpanel-main', { 
      title: 'Lunar User Panel',
      name: res.locals.userName,
      surname: res.locals.userSurname,
      lastLoginDate: res.locals.userLastLoginDate,
      status: res.locals.userStatus,
  
      layout: 'usrpanel-layout'
    });
};

