module Api
  class TitlesController < ApplicationController
    def index
      @titles = Title.all
    end
  end
end
