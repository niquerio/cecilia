require "rails_helper"

RSpec.describe Api::ActivitiesController, "#schedule" do
  context "when class is multihour" do
    it "does not output td for class in second hour" do
      event = create(:event)
      start_time = DateTime.now
      end_time = start_time + 2.hours
      user = create(:user, title: Title.find_by(name: "Lord"), sca_first_name: "Mundungus", sca_last_name: "Smith")
      classroom = create(:classroom, event_id: event.id)
      activity = create(:activity, 
        activity_type: ActivityType.first, 
        activity_subtype: ActivitySubtype.first, 
        title: "It's a class", 
        description: "This is the description for this class", 
        difficulty: Difficulty.first, 
        event_id: event.id, 
        classroom_id: classroom.id, 
        start_time: start_time, 
        end_time: end_time) 

      teacher = create(:teacher, user_id: user.id, activity_id: activity.id)
      

      get :schedule, :event_id => event.id, :format=>"json"
      keys = assigns(:activities)[0].keys.sort
      expect(keys.length).to eq 2
      expect(assigns(:activities)[0][keys[0]].length).to eq 1  
      expect(assigns(:activities)[0][keys[1]].length).to eq 0  
      
    end
  end
  context "when there is no class for a timeslot" do
    it "outputs a td with no title" do
      event = create(:event)
      start_time = DateTime.now
      end_time = start_time + 1.hour
      user = create(:user, title: Title.first, sca_first_name: "Mundungus", sca_last_name: "Smith")
      classroom = create(:classroom, event_id: event.id)
      classroom2 = create(:classroom, event_id: event.id, name: "Empty Classroom")
      activity = create(:activity, 
        activity_type: ActivityType.first, 
        activity_subtype: ActivitySubtype.first, 
        title: "It's a class", 
        description: "This is the description for this class", 
        difficulty: Difficulty.first, 
        event_id: event.id, 
        classroom_id: classroom.id, 
        start_time: start_time, 
        end_time: end_time) 

      activity2 = create(:activity, 
        activity_type: ActivityType.first, 
        activity_subtype: ActivitySubtype.first, 
        title: "It's a class", 
        description: "This is the description for this class", 
        difficulty: Difficulty.first, 
        event_id: event.id, 
        classroom_id: classroom2.id, 
        start_time: start_time + 1.hour, 
        end_time: end_time + 1.hour) 

      teacher = create(:teacher, user_id: user.id, activity_id: activity.id)
      teacher2 = create(:teacher, user_id: user.id, activity_id: activity2.id)

      get :schedule, :event_id => event.id, :format=>"json"
      keys = assigns(:activities)[0].keys.sort
      expect(assigns(:activities)[0][keys[0]][0].title).to eq "It's a class"  
      expect(assigns(:activities)[0][keys[0]][1].title).to be_nil  

    end
  end
end
