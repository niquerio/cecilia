module Api
  class ActivitiesController < ApplicationController
    def index
      @activities = Activity.where('event_id = ? AND classroom_id IS NOT NULL', params[:event_id])  
      @teachers = Teacher.all
      
    end
    def index_all
      @activities = Activity.where('classroom_id IS NOT NULL')
      @teachers = Teacher.all
    end
    def show
      @activity = Activity.find(params[:id])
      @teachers = Teacher.where(activity_id: params[:id]);
    end
    def schedule
      @event = Event.find(params[:event_id])
      activities_list = Activity.where(event_id: params[:event_id]).where.not(start_time: nil).order(:start_time, :classroom_id).to_a
      @teachers = Teacher.all
      @start_times = []
      @activities =  []
      
      for i in 0 .. ((@event.end_date - @event.start_date)/86400).round
        @activities[i] = Hash.new
        classrooms = Activity.where('start_time >= :start AND start_time <= :end', {start: @event.start_date + i.day, end: (@event.start_date + (1+i).day)}).distinct.pluck(:classroom_id)
        classroom_current_activities = Hash[*classrooms.map { |k| [k,nil]}.flatten]
          
        start = Activity.where('start_time >= :start', {start: @event.start_date + i.day}).order(:start_time).first.start_time
        finish = Activity.where('start_time >= :start AND start_time <= :end', {start: @event.start_date + i.day, end: (@event.start_date + (1+i).day)}).order(:start_time).last.end_time
        

        while start < finish
          while activities_list.first && activities_list.first.start_time == start
            activity = activities_list.shift()
            classroom_current_activities[activity.classroom_id] = activity 
          end
          activities_in_timeslot = []

          classrooms.each do |classroom|
            if activity = classroom_current_activities[classroom]
              if activity.start_time == start
                activities_in_timeslot.push(activity)
              else
                # class held over from previous time slot
              end
              if activity.end_time == start + 1.hour
                classroom_current_activities[classroom] = nil
              end
            else
              activities_in_timeslot.push(Activity.new(classroom_id: classroom, start_time: start, end_time: start+1.hour, event_id: @event.id))
            end
                
          end
          @activities[i][start] = activities_in_timeslot 
          start += 1.hour
        end 
          
      end
     

    end
  end
end
