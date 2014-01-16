class SpreadsheetsController < ApplicationController

  def index
    @spreadsheets = Spreadsheet.all
    @spreadsheets.to_json
  end

  def new
    @course = Course.get(params[:course_id])
  end

  def show
    @course = Course.get(params[:course_id])
    @spreadsheet = Spreadsheet.get(params[:id])
    @spreadsheet.to_json
  end

  def create
    course = Course.get(params[:course_id])
    spreadsheet = Spreadsheet.from_key(params["key"])
    course.spreadsheets << spreadsheet
    course.save!
    if course.save
      @notice = "Added spreadsheet"
    else
      @error = "Could not add spreadsheet"
    end     
      redirect_to course_path(course.id)
  end

  def update
    @updated = Spreadsheet.select(&:write_content)
    @notice = "Updated #{@updated.length} spreadsheets"
  end

end
