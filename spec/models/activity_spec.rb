require "rails_helper"

RSpec.describe Activity, "validations" do
  it { is_expected.to validate_presence_of(:title) }
  it { is_expected.to validate_presence_of(:activity_type) }
  it { is_expected.to validate_presence_of(:activity_subtype) }
  it { is_expected.to validate_presence_of(:difficulty) }
  it { is_expected.to validate_presence_of(:event) }
  it "does not save activity without at least one associated teacher" do
    items = generate_activity_without_teacher
    expect(items[:activity].save).to be_falsey   
  end
  
end
def generate_activity_without_teacher
  event = create(:event)
  start_time = DateTime.now
  end_time = DateTime.now + 1.hour
  title = create(:title)
  activity_type = create(:activity_type)
  activity_subtype = create(:activity_subtype)
  difficulty = create(:difficulty)
  user = create(:user, title: title, sca_first_name: "Mundungus", sca_last_name: "Smith")
  classroom = create(:classroom, event_id: event.id)
  activity = Activity.new(
    activity_type: activity_type, 
    activity_subtype: activity_subtype, 
    title: "It's a class", 
    description: "This is the description for this class", 
    difficulty: difficulty, 
    event_id: event.id, 
    classroom_id: classroom.id, 
    start_time: start_time, 
    end_time: end_time
  ) 


  return {event: event, activity: activity, user: user}
end
