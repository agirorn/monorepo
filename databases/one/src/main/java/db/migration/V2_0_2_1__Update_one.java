package db.migration;

import org.flywaydb.core.api.migration.BaseJavaMigration;
import org.flywaydb.core.api.migration.Context;
import java.sql.ResultSet;
import java.sql.Statement;

public class V2_0_2_1__Update_one extends BaseJavaMigration {
    public void migrate(Context context) throws Exception {
        try (Statement select = context.getConnection().createStatement()) {
            try (ResultSet rows = select.executeQuery("SELECT id, name FROM one ORDER BY id")) {
                while (rows.next()) {
                    int id = rows.getInt(1);
                    String name = rows.getString(2);
                    String anonymizedName = "Anonymous" + id;
                    try (Statement update = context.getConnection().createStatement()) {
                        update.execute(
                            "UPDATE one SET name='" + anonymizedName + "', real_name='" + name +  "' WHERE id=" + id
                            );
                    }
                }
            }
        }
    }
}
