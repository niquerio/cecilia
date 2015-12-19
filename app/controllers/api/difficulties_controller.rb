module Api
  class DifficultiesController < ApplicationController
    def index
      @difficulties = Difficulty.all
    end
  end
end
