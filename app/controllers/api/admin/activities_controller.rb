module Api
  module Admin
    class ActivitiesController < ApplicationController
      before_action :authenticate_user!
      def index
        @activities = Activity.where(event_id: params[:event_id]) 
        @teachers = Teacher.all
      end
      def show
        @activity = Activity.find(params[:id])
        @teachers = Teacher.all
      end
      def destroy
        activity = Activity.find(params[:id])
        if(activity.destroy)
          render json: {msg: "item deleted!"}, status: :ok
        else
          render json: {errors: teacher.errors.full_messages},
          status: :unprocessable_entity
        end
        
      end 
      def scheduled
        @event = Event.find(params[:event_id]);
        @activities = [] 
        @classrooms = Classroom.where(event_id: params[:event_id]);
        for i in 0 .. ((@event.end_date - @event.start_date)/86400).round
          @activities[i] = Hash.new
          for j in 9 .. 16
            activities_in_timeslot = []
            start = @event.start_date + i.day + j.hour
            @classrooms.each do |classroom|
              activity = Activity.where('event_id = ? AND start_time = ? AND classroom_id = ?', params[:event_id],  start, classroom.id).first; 
              unless activity.nil?
                activities_in_timeslot.push(activity)
              else
                activities_in_timeslot.push(Activity.new(classroom_id: classroom.id, start_time: start, duration: 60, event_id:@event.id))
                
              end
            end 
            @activities[i][start] = activities_in_timeslot;
          end
        end
      end
      def unscheduled
        @event = Event.find(params[:event_id])
        @activities = Activity.where('event_id = ? AND classroom_id IS NULL', params[:event_id])  
      end
      def create
        act_params = activity_params;
        users = act_params.delete(:users)
        
        @activity = Activity.new(act_params)
        @activity.event_id = params[:event_id]

        if @activity.save
          users.each{ |user_id| 
            teacher = Teacher.new(activity: @activity, user_id: user_id)
            if(!teacher.save)
              render json: {errors: teacher.errors.full_messages},
              status: :unprocessable_entity
            end
          }
          @teachers = Teacher.where(activity: @activity)
          render :show, status: :created
        else
          render json: {errors: @activity.errors.full_messages},
          status: :unprocessable_entity
        end
      end
      def update
        @activity = Activity.find(params[:id])
        act_params = activity_params;
        users = act_params.delete(:users)
        
        if users
          old_teachers = Teacher.where(activity_id: @activity.id)
          old_teachers.each{ |old_teacher|
            if(users.include?(old_teacher.id))
              users.delete(old_teacher.id)
            else
              old_teacher.destroy
            end
          }
          
          users.each{ |user_id|
            teacher = Teacher.new(activity: @activity, user_id: user_id)
            if(!teacher.save)
              render json: {errors: teacher.errors.full_messages},
              status: :unprocessable_entity
            end
          }
        end
        
        if @activity.update_attributes(act_params)
          @teachers = Teacher.where(activity: @activity)
          render :show, status: :ok
        else
          render json: {errors: @activity.errors.full_messages},
          status: :unprocessable_entity
        end
      end

      private
      def activity_params
        params.permit(
          :event_id,
          :title, 
          :description, 
          :difficulty_id, 
          :activity_type_id, 
          :activity_subtype_id, 
          :duration, 
          :start_time,
          :classroom_id,
          :users => [])
      end
    end
  end
end
