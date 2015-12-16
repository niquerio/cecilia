module Api
  module Admin
    class ClassroomsController < ApplicationController
      before_action :authenticate_user!
      def index
        @classrooms = Classroom.where(event_id: params[:event_id])  
      end
      def show
        @classroom = Classroom.find(params[:id])
      end
      def create
        classroom = Classroom.new(classroom_params)
        classroom.event_id = params[:event_id]

        if classroom.save
          render json: classroom, status: :created
        else
          render json: {errors: classroom.errors.full_messages},
          status: :unprocessable_entity
        end
      end
      def update
        classroom = Classroom.find(params[:id])
        if classroom.update_attributes(classroom_params)
          render json: classroom, status: :ok
        else
          render json: {errors: classroom.errors.full_messages},
          status: :unprocessable_entity
        end
      end

      private
      def classroom_params
        params.require(:classroom).permit(:name)
      end
    end
  end
end
