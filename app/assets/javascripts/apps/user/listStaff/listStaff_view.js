Cecilia.module("UserApp.ListStaff", function(ListStaff, Cecilia, Backbone, Marionette, $, _){
  
  ListStaff.StaffMember = Marionette.ItemView.extend({
    template: "user/listStaff_staffMember",
    tagName: "li",
  });
  ListStaff.Staff = Marionette.CompositeView.extend({
    template: "user/listStaff",
    childView: ListStaff.StaffMember,
    childViewContainer: "ul",
  });
});
