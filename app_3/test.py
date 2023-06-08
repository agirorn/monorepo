import unittest

import app_3


class ExampleTest(unittest.TestCase):
    def test_main(self):
        self.assertIn("STRING", app_3.get_string())


if __name__ == "__main__":
    unittest.main()
