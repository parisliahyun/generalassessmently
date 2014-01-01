class SpreadsheetsController < ApplicationController

  def index
    @spreadsheets = Spreadsheet.all
    @spreadsheets.to_json
  end

  def show
    @spreadsheet = Spreadsheet.get(params[:id])
    @spreadsheet.to_json
  end

  def create
    spreadsheet = Spreadsheet.from_key(params[:key]) 
    if spreadsheet.save
      @notice = "Added spreadsheet"
    else
      @error = "Could not add spreadsheet"
    end     
      redirect_to root_path
  end

  def update
    @updated = Spreadsheet.select(&:write_content)
    @notice = "Updated #{@updated.length} spreadsheets"
    erb :index
  end

end
