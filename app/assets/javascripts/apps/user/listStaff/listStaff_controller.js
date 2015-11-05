Cecilia.module("UserApp.ListStaff", function(ListStaff, Cecilia, Backbone, Marionette, $, _){
  ListStaff.Controller = {
    listStaff: function(){
      var staff = Cecilia.request("user:entities:staff");
      var staffView = new ListStaff.Staff({collection:staff});

      Cecilia.regions.main.show(staffView);
    },
  };
});
