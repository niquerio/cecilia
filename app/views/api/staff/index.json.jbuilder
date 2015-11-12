json.array! (@staff) do |staff_member|
  json.staff_role staff_member.staff_role.name
  json.title staff_member.user.title.name
  json.sca_first_name staff_member.user.sca_first_name
  json.sca_last_name staff_member.user.sca_last_name
end
