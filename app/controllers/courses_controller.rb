class CoursesController < ApplicationController
  before_filter :set_course
  def index
    @courses = Course.all
    # @courses.to_json
  end

  def show
    @course = Course.get(params[:id])
    # @course.to_json
  end

  def create
    @course = Course.create(:title => params[:title])
    if @course.save
      @notice = "Added course"
    else
      @error = "Could not add course"
    end     
      redirect_to root_path
  end

private

def set_course
  @course = Course.get(params[:id])
  current_course = @course
end

end