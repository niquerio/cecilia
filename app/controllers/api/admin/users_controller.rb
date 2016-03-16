module Api
  module Admin
    class UsersController < ApplicationController
      before_action :authenticate_user!
      def index
        @users = User.all
      end
      def show
        @user = User.find(params[:id])
      end
      def create
        user = User.new(user_params)
        user.password = Devise.friendly_token.first(8) 

        if user.save
          render json: user, status: :created
        else
          render json: {errors: user.errors.full_messages},
          status: :unprocessable_entity
        end
      end
      def update
        @user = User.find(params[:id])
        if @user.update_without_password(user_params)
          render json: @user, status: :ok
        else
          render json: {errors: @user.errors.full_messages},
          status: :unprocessable_entity
        end
      end

      private
      def user_params
        params.require(:user).permit(:email, :username, :modern_first_name, :modern_last_name, :sca_first_name, :sca_last_name, :title_id, :nickname, :bio)
      end
    end
  end
end
