class RemoveUrlFromSpreadsheets < ActiveRecord::Migration
    def change
      change_table :spreadsheets do |t|
      t.remove :url
    end
  end
end
