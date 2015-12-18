module Api
  class UsersController < ApplicationController
    def index
      @users = User.all
    end
  end
end
