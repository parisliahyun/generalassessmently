class ProcessController < ApplicationController

  def index
  end

  def create
    @updated = Spreadsheet.select(&:write_content)
    @notice = "Updated #{@updated.length} spreadsheets"
    erb :index
  end

end