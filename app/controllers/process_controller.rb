class ProcessController < ApplicationController

  def index
    erb :index
  end

  def create
    @updated = Spreadsheet.select(&:write_content)
    @notice = "Updated #{@updated.length} spreadsheets"
    redirect_to root_path
  end

end