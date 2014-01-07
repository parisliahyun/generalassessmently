class AppController < ApplicationController
  def index
    @courses = Course.all
  end
end