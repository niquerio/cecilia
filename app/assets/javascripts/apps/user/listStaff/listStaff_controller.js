Cecilia.module("UserApp.ListStaff", function(ListStaff, Cecilia, Backbone, Marionette, $, _){
  ListStaff.Controller = {
    listStaff: function(){
      var fetchingStaff = Cecilia.request("user:entities:staff");
      $.when(fetchingStaff).done(function(staff){
        var staffView = new ListStaff.Staff({collection:staff});

        Cecilia.regions.main.show(staffView);
      });
    },
  };
});
