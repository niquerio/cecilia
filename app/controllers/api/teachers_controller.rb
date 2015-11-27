module Api
  class TeachersController < ApplicationController
    def index
      @event = Event.find(params[:event_id])
      @users = User.joins(:activities).where(activities: { event_id: params[:event_id] }).distinct.order(:sca_first_name, :sca_last_name) 
      
    end
    def index_all
      @users = User.joins(:teachers).distinct      
    end
    def show
      @user = User.find_by(username: params[:username])
    end
  end
end
