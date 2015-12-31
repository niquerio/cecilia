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
          :users => [])
      end
    end
  end
end
